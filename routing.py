import os
import bottle
from bottle import run, get, static_file

@get("/<static:path>")
def hello_world(static):
        return static_file(static,root="static")

if __name__ == "__main__":
        run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

app = bottle.default_app()