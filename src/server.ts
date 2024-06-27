import Fastify, { FastifyReply, FastifyRequest } from "fastify"
import fs, { existsSync, mkdirSync } from "node:fs"
import { unpack } from "msgpackr"

// the port to listen from
const listenPort = 8000
const saveDirectory = process.cwd() + "/saves"
if (!existsSync(saveDirectory)) {
    // make the data directory since it doesn't exist
    try {
        mkdirSync(saveDirectory)
    } catch (error) {
        throw new Error(`Failed to create the data directory. Reason: ${(error as Error).message}`)
    }
}

// initialize server
const fastify = Fastify({
    logger: false
})

// content-type parsers
fastify.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: 'string' }, (req, body: string, done) => {
    try {
        done(null, body)
    } catch (err) {
        done(err as Error, undefined)
    }
})

// listen for /latest/api/index.php/load
fastify.post("/latest/api/index.php/load", async (request: FastifyRequest, reply: FastifyReply) => {
    console.log("Received load request from the game client...")

    const headers = request.headers

    const playerId = headers['kakao_pid'] as string

    console.log("Loading save data from official servers...")
    const serverResponse = await fetch("https://na.wdfp.kakaogames.com/latest/api/index.php/load", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "APP_VER": headers['app_ver'] as string,
            "DEVICE_NAME": headers['device_name'] as string,
            "DEVICE_LANG": headers['device_lang'] as string,
            "KAKAO_PID": playerId,
            "APP_ID": headers['app_id'] as string,
            "COUNTRY_CODE": headers['country_code'] as string,
            "UDID": headers['udid'] as string,
            "SHORT_UDID": headers['short_udid'] as string,
            "GAME-APP-ID": headers['game-app-id'] as string,
            "PARAM": headers['param'] as string,
            "DEVICE": headers['device'] as string
        },
        body: request.body as string
    }).catch(err => {
            console.log(`Error when communication with official server: ${err}`)
            return null
        })

    if (!serverResponse) return reply.status(500).send({
        "error": "Internal Server Error",
        "message": "Error when communicating with official server.."
    })

    console.log("Received save data from official servers. Saving...")
    const bodyText = await serverResponse.text()
    fs.writeFileSync(`${saveDirectory}/${playerId}.json`, JSON.stringify(unpack(Buffer.from(bodyText, "base64")), (_, value) => 
        typeof value === 'bigint' ? value.toString() : value
    ))
    console.log(`Save data saved to ${saveDirectory}/${playerId}.json.`)

    reply.header("content-type", "application/x-msgpack")
    reply.status(200).send(bodyText)
})

// listen
fastify.listen({ port: listenPort }, (err, _) => {
    if (err) {
        fastify.log.error(err)
        console.log(err)
        process.exit(1)
    }
    console.log(`Save downloader server listening on http://localhost:${listenPort}`)
    console.log("Waiting for the request from the game client...")
})