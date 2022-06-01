
package io.kongproxy.developer.udp;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

import net.datafaker.Faker;
import net.datafaker.RickAndMorty;

import org.reactivestreams.Publisher;

import java.time.Duration;
import java.util.function.BiFunction;

import io.netty.buffer.Unpooled;
import io.netty.channel.socket.DatagramPacket;
import io.netty.util.CharsetUtil;
import lombok.extern.slf4j.Slf4j;
import reactor.netty.Connection;
import reactor.netty.udp.UdpInbound;
import reactor.netty.udp.UdpOutbound;
import reactor.netty.udp.UdpServer;

import static reactor.core.publisher.Mono.error;

@Slf4j
public class App {

  public String getGreeting() {
    return "Hello World!";
  }

  public static void main(String[] args) {
    final Config c = ConfigFactory.load();
    final int port = c.getInt("server.port");
    final String localhost = c.getString("server.host");
    final boolean wiretap = c.getBoolean("server.wiretap");

    final RickAndMorty rickAndMorty = Faker.instance().rickAndMorty();

    Connection server = UdpServer.create()
        .host(localhost)
        .port(port)
        .wiretap(wiretap)
        .handle(new MyQuoteHandler(rickAndMorty))
        .bindNow(Duration.ofSeconds(30));

    server.onDispose()
        .block();
  }
}

class MyQuoteHandler implements BiFunction<UdpInbound, UdpOutbound, Publisher<Void>> {

  private final RickAndMorty rickAndMorty;

  public MyQuoteHandler(RickAndMorty rm) {
    this.rickAndMorty = rm;
  }

  @Override
  public Publisher<Void> apply(final UdpInbound in, final UdpOutbound out) {
    return out.sendObject(
        in.receiveObject()
            .map(o -> {
              if (o instanceof DatagramPacket) {
                var p = (DatagramPacket) o;
                var buf = Unpooled.copiedBuffer(rickAndMorty.quote(), CharsetUtil.UTF_8);
                return new DatagramPacket(buf, p.sender());
              } else {
                return error(new Exception("Unexpected type of the message: " + o));
              }
            }));
  }
}