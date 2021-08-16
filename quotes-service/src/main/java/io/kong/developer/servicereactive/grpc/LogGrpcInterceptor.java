package io.kong.developer.servicereactive.grpc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.grpc.Metadata;
import io.grpc.ServerCall;
import io.grpc.ServerCallHandler;
import io.grpc.ServerInterceptor;

public class LogGrpcInterceptor implements ServerInterceptor {

  private static final Logger log = LoggerFactory.getLogger(LogGrpcInterceptor.class);

  @Override
  public <ReqT, RespT> ServerCall.Listener<ReqT> interceptCall(ServerCall<ReqT, RespT> serverCall, Metadata metadata,
                                                               ServerCallHandler<ReqT, RespT> serverCallHandler) {
    log.info(serverCall.getMethodDescriptor().getFullMethodName());
    return serverCallHandler.startCall(serverCall, metadata);
  }

}