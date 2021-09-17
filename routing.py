import os
import bottle
from bottle import run, get, post, static_file, template, request

@get("/")
def index():
        return template("index")

@post("/")
def api_call():
        return str(request.forms.send_data)

@get("/static/<static:path>")
def get_static(static):
        return static_file(static,root="static")

if __name__ == "__main__":
        run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

app = bottle.default_app()