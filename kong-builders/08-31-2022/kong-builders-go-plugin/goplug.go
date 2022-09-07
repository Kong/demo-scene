package main

import (
	"github.com/Kong/go-pdk"
	"github.com/Kong/go-pdk/server"
	"log"
	"strings"
)

type Config struct {
	Attach bool
}

func New() interface{} {
	return &Config{}
}

const Version string = "0.0.1"
const Priority = 1

func main() {
	server.StartServer(New, Version, Priority)
}

func (c Config) Access(kong *pdk.PDK) {
	userAgent, _ := kong.Request.GetHeader("user-agent")
	log.Printf("Got request from %s", userAgent)
	service, _ := kong.Router.GetService()

	if c.Attach {
		if strings.Contains(userAgent, "Kong Builders") {
			kong.Response.SetHeader("X-Kong-Builders-Name", service.Name)
			kong.Response.SetHeader("X-Kong-Builders-Host", service.Host)
			kong.Response.SetHeader("X-Kong-Builders-Protocol", service.Protocol)
		}
	}
}
