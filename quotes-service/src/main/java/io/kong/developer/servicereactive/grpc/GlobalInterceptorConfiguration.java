package io.kong.developer.servicereactive.grpc;

import net.devh.boot.grpc.server.interceptor.GrpcGlobalServerInterceptor;

import org.springframework.context.annotation.Configuration;

@Configuration(proxyBeanMethods = false)
public class GlobalInterceptorConfiguration {

  @GrpcGlobalServerInterceptor
  LogGrpcInterceptor logServerInterceptor() {
    return new LogGrpcInterceptor();
  }

}