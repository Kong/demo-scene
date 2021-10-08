
package io.kongproxy.developer.udp;

import com.github.javafaker.Faker;
import com.github.javafaker.RickAndMorty;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

import org.reactivestreams.Publisher;

import java.time.Duration;
import java.util.function.BiFunction;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.socket.DatagramPacket;
import io.netty.util.CharsetUtil;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.netty.Connection;
import reactor.netty.udp.UdpInbound;
import reactor.netty.udp.UdpOutbound;
import reactor.netty.udp.UdpServer;

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
    return out.sendObject(in.receiveObject()
                              .map(o -> {
                                if (o instanceof DatagramPacket) {
                                  DatagramPacket p = (DatagramPacket) o;
                                  ByteBuf buf = Unpooled.copiedBuffer(rickAndMorty.quote(), CharsetUtil.UTF_8);
                                  return new DatagramPacket(buf, p.sender());
                                } else {
                                  return Mono.error(new Exception("Unexpected type of the message: " + o));
                                }
                              }));
  }
}