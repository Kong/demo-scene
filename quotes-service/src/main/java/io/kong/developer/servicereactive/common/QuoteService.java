package io.kong.developer.servicereactive.common;

import net.datafaker.Faker;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class QuoteService {

  @Value("${QUOTE_SERVICE:backToFuture}")
  private String quoteConfig;

  private final Faker faker;

  public QuoteService() {
    faker = new Faker();
  }

  public String getFakeQuote() {
    final String quote;

    switch (quoteConfig.toUpperCase()) {
      case "CHUCK":
        quote = faker.chuckNorris().fact();
        break;
      case "HOBBIT":
        quote = faker.hobbit().quote();
        break;
      default:
        quote = faker.backToTheFuture().quote();
    }
    return quote;
  }
}
