#!/usr/bin/env python

import asyncio
import websockets
import time
import numpy as np
import json

acitivies = ['Downstairs', 'Running', 'Sitting', 'Standing', 'Upstairs', 'Walking']


async def handleConnection(websocket):
    print('Established Websocket connection')
    while True:
        time.sleep(2)
        random_index = np.random.randint(0, 5, 1)[0]
        response = {}
        response['activity'] = acitivies[random_index]
        await websocket.send(json.dumps(response))


async def main():
    async with websockets.serve(handleConnection, "localhost", 8765):
        await asyncio.Future()  # run forever


asyncio.run(main())
