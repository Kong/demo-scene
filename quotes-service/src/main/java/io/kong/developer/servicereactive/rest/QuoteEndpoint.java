package io.kong.developer.servicereactive.rest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.util.Optional;

import io.fabric8.kubernetes.api.model.Config;
import io.kong.developer.servicereactive.common.QuoteService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@RestController
@RequiredArgsConstructor
class QuoteEndpoint {

  private final QuoteService quoteService;

  @SneakyThrows
  @GetMapping(value = "/", produces = {MediaType.APPLICATION_JSON_VALUE})
  public ResponseEntity<Response> hello() {
    final Response response = new Response(quoteService.getFakeQuote());
    
    HttpHeaders httpHeaders = new HttpHeaders();
    final Optional<String> hostname = Optional.ofNullable(System.getenv("HOSTNAME"));
    final Optional<String> podNamespace = Optional.ofNullable(System.getenv("KUBERNETES_NAMESPACE"));
    httpHeaders.add("X-Pod-Name", hostname.orElse(String.valueOf(InetAddress.getLocalHost())));
    httpHeaders.add("X-Pod-Namespace", podNamespace.orElse("UNKNOWN"));
    return new ResponseEntity<>(response, httpHeaders, HttpStatus.OK);
  }
}
