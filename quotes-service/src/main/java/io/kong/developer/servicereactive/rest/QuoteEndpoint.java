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
    return new ResponseEntity<>(new Response(quoteService.getFakeQuote()), HttpStatus.OK);
  }
}
