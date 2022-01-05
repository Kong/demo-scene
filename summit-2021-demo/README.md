# Kong Summit 2021 Keynote Demo

This repo contains all the assets required for the product team Kong Summit 2021 demo.

There are four parts to the demo:

1. **Insomnia**: Showcase design, debug, test workflow works. Show how plugins can be added to an existing API (e.g. rate limiting) via Konnect
2. **Gateway**: Take the specification shown by Steph and show how to run linting + tests via `inso`. Generate a config via `inso` and apply with `deck` (note: This will need a `convert konnect` step). Add the JQ plugin via the config + deploy
3. **Mesh**: Show _Service Map_ and _Traffic Policies_ in Mesh. Disable API<->Database connectivity and show the API failing (don't forget to re-enable).
4. **ServiceHub/Portal**: Show the service that was created by `deck` in ServiceHub. Attach the OpenAPI spec for internal documentation. Show Vitals when traffic is sent to the application. Publish the service in the Portal for external consumption.
