package io.kong.developer.servicereactive.rest;

import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import java.net.InetAddress;

import lombok.SneakyThrows;
import reactor.core.publisher.Mono;

import static java.lang.System.getenv;
import static java.util.Optional.ofNullable;

@Component
/**
 * a filter that adds additional headers with Kubernetes pod and namespace information.
 * TODO: make conditional if running in Kubernetes environment
 */
public class PodsWebFilter implements WebFilter {

  @SneakyThrows
  @Override
  public Mono<Void> filter(final ServerWebExchange exchange, final WebFilterChain chain) {

    final var httpHeaders = exchange.getResponse().getHeaders();
    final var hostname = ofNullable(getenv("HOSTNAME"));
    final var podNamespace = ofNullable(getenv("KUBERNETES_NAMESPACE"));
    httpHeaders.add("X-Pod-Name", hostname.orElse(String.valueOf(InetAddress.getLocalHost())));
    httpHeaders.add("X-Pod-Namespace", podNamespace.orElse("UNKNOWN"));

    return chain.filter(exchange);
  }
}
