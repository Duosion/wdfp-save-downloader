from mitmproxy import http
from mitmproxy.log import ALERT
from ruamel.yaml import YAML

# The host name and port of the server.
API_HOST = "localhost"
API_PORT = 8000
API_SCHEME = 'http'

# "hostname": prefix_index
hosts = {
    # na server
    "na.wdfp.kakaogames.com": True,
    "kr.wdfp.kakaogames.com": True,
    "eu.wdfp.kakaogames.com": True,
    "sea.wdfp.kakaogames.com": True
}

def request(flow: http.HTTPFlow) -> None:
    redirect = hosts.get(flow.request.pretty_host)
    if redirect and flow.request.path == "/latest/api/index.php/load":
        flow.request.host = API_HOST
        flow.request.port = API_PORT
        flow.request.scheme = API_SCHEME