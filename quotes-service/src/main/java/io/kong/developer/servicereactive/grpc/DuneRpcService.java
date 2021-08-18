package io.kong.developer.servicereactive.grpc;

import com.google.protobuf.Empty;

import com.github.javafaker.Faker;

import net.devh.boot.grpc.server.service.GrpcService;

import java.util.stream.Stream;

import io.grpc.stub.StreamObserver;
import io.kong.developer.quoteservice.QuoteMessage;
import io.kong.developer.quoteservice.QuoteServiceGrpc;
import lombok.RequiredArgsConstructor;

@GrpcService
@RequiredArgsConstructor
public class DuneRpcService extends QuoteServiceGrpc.QuoteServiceImplBase {

  @Override
  public void getQuote(final Empty request,
                       final StreamObserver<QuoteMessage> responseObserver) {

    final QuoteMessage message = QuoteMessage.newBuilder().setMessage(Faker.instance().dune().quote()).build();
    responseObserver.onNext(message);
    responseObserver.onCompleted();
  }

  @Override
  public void getQuoteStream(final Empty request, final StreamObserver<QuoteMessage> responseObserver) {
    Stream.generate(() -> QuoteMessage.newBuilder().setMessage(Faker.instance().dune().quote()).build())
        .limit(10)
        .forEach(responseObserver::onNext);
    responseObserver.onCompleted();
  }
}
