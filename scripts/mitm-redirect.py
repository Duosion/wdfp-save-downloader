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
    "3.210.14.73": True,
    "3.222.140.107": True
}

def request(flow: http.HTTPFlow) -> None:
    redirect = hosts.get(flow.request.host)
    if redirect and flow.request.path == "/latest/api/index.php/load":
        flow.request.host = API_HOST
        flow.request.port = API_PORT
        flow.request.scheme = API_SCHEME