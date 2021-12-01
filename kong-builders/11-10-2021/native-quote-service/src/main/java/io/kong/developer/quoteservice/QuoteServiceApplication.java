package io.kong.developer.quoteservice;

import com.github.javafaker.Faker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.nativex.hint.NativeHint;
import org.springframework.nativex.hint.ResourceHint;

import javax.annotation.Resource;

@SpringBootApplication
@NativeHint(resources = {
    // resources from Java Faker library 
    // https://github.com/spring-projects-experimental/spring-native/blob/main/spring-aot/src/test/java/org/springframework/nativex/HintTests.java#L143
    // https://www.graalvm.org/reference-manual/native-image/Resources/
    @ResourceHint(patterns = {"en-US.yml"}),
    @ResourceHint(patterns = {"en.yml"}),
    @ResourceHint(patterns = {"en/back_to_the_future.yml"}),
    @ResourceHint(patterns = {"en/.*.yml"})
})
public class QuoteServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(QuoteServiceApplication.class, args);
  }

  @Bean
  public Faker faker() {
    return Faker.instance();
  }
}