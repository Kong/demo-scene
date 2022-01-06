import com.konghq.testcontainers.KongContainer
@GrabResolver(name = 'jitpack', root = 'https://jitpack.io', m2Compatible = 'true')
@Grab('com.github.gamussa:testcontainers-kong:main-SNAPSHOT')
@Grab("io.rest-assured:rest-assured:4.4.0")
@GrabExclude("org.codehaus.groovy:groovy-xml")
@GrabExclude("org.codehaus.groovy:groovy-json")
import groovy.util.logging.Slf4j
import io.restassured.http.ContentType
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.testcontainers.containers.output.Slf4jLogConsumer
import org.testcontainers.utility.MountableFile

import static com.konghq.testcontainers.KongContainer.KONG_DEFAULT_TAG
import static io.restassured.RestAssured.get
import static org.hamcrest.Matchers.containsString
import static org.testcontainers.utility.DockerImageName.parse

@Slf4j
class KongTest {

  static def kongContainer = new KongContainer(parse(KONG_DEFAULT_TAG))
      .withEnv("KONG_DECLARATIVE_CONFIG", "/opt/kong/kong.yaml")
      .withCommand("kong start --v")

  @BeforeAll
  static void setup() {

    File kongYaml = File.createTempFile("kong.yaml", null).with(true) {

      def yaml = """
# a very minimal declarative config file
_format_version: "2.1"
_transform: true
"""
      it.deleteOnExit()
      it.write yaml
    }

    println kongYaml.absolutePath
    kongContainer.withLogConsumer(new Slf4jLogConsumer(log))
    kongContainer.withCopyFileToContainer(MountableFile.forHostPath(kongYaml.absolutePath), "/opt/kong/kong.yaml")

    kongContainer.start()

  }

  @Test
  void "check welcome message"() {
    get(kongContainer.getaAdminUrl())
    //.peek()
        .then()
        .statusCode(200)
        .contentType(ContentType.JSON)
        .header("Server", containsString("2.6.0"))
        .body("tagline", containsString("Welcome to kong"))
  }
}

