package io.kong.developer.servicereactive.grpc;

import com.google.protobuf.Empty;

import net.datafaker.Dune;
import net.datafaker.Faker;
import net.devh.boot.grpc.server.service.GrpcService;

import org.springframework.beans.factory.annotation.Value;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

import io.grpc.stub.StreamObserver;
import io.kong.developer.quoteservice.QuoteMessage;
import io.kong.developer.quoteservice.QuoteServiceGrpc;
import lombok.RequiredArgsConstructor;

@GrpcService
@RequiredArgsConstructor
public class DuneRpcService extends QuoteServiceGrpc.QuoteServiceImplBase {

  @Value("${grpc.server.dune.stream.rate:1}")
  private int rate;

  @Value("${grpc.server.dune.stream.limit:1}")
  private int limit;

  final Dune dune = Faker.instance().dune();

  @Override
  public void getQuote(final Empty request,
                       final StreamObserver<QuoteMessage> responseObserver) {
    final QuoteMessage message = QuoteMessage.newBuilder().setMessage(dune.quote()).build();
    responseObserver.onNext(message);
    responseObserver.onCompleted();
  }

  @Override
  public void getQuoteStream(final Empty request, final StreamObserver<QuoteMessage> responseObserver) {
    final var quoteMessageBuilder = QuoteMessage.newBuilder();
    final BlockingQueue<QuoteMessage> queue = new LinkedBlockingQueue<>(100);

    var scheduler = new ScheduledThreadPoolExecutor(1);
    scheduler.scheduleAtFixedRate(() -> {
      // Generate new data every 1s, regardless of their processing rate
      queue.offer(quoteMessageBuilder.setMessage(dune.quote()).build());
    }, 0, rate, TimeUnit.SECONDS);

    Stream.generate(() -> {
          try {
            return queue.take();
          } catch (InterruptedException e) {
            throw new RuntimeException(e);
          }
        }).limit(limit)
        .forEach(responseObserver::onNext);
    responseObserver.onCompleted();
  }
}
