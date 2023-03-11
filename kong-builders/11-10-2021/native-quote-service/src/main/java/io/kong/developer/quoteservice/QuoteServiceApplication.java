package io.kong.developer.quoteservice;


import net.datafaker.Faker;

import org.springframework.aot.hint.RuntimeHints;
import org.springframework.aot.hint.RuntimeHintsRegistrar;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportRuntimeHints;

import static io.kong.developer.quoteservice.QuoteServiceApplication.*;

@SpringBootApplication
@ImportRuntimeHints(FakerRuntimeHints.class)
public class QuoteServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(QuoteServiceApplication.class, args);
  }

  @Bean
  public Faker faker() {
    return Faker.instance();
  }

  static class FakerRuntimeHints implements RuntimeHintsRegistrar {

    @Override
    public void registerHints(final RuntimeHints hints, final ClassLoader classLoader) {
      hints.resources()
          .registerPattern("en-US.yml")
          .registerPattern("en.yml")
          .registerPattern("en/back_to_the_future.yml")
          .registerPattern("en/.*.yml");
    }
  }
}
