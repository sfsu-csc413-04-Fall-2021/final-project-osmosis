package response;

import java.util.Map;

public class CustomHttpResponse {
  public final Map<String,String> headers;
  public final String status;
  public final String version;
  public final String body;

  public CustomHttpResponse(Map<String, String> headers, String status, String version,
      String body) {
    this.headers = headers;
    this.status = status;
    this.version = version;
    this.body = body;
  }

  public String toString() {
    StringBuilder string = new StringBuilder();
    string.append(version);
    string.append(" ");
    string.append(status);
    string.append("\n");
    for(String key:headers.keySet()) {
      string.append(key);
      string.append(": ");
      string.append(headers.get(key));
      string.append("\n");
    }
    if(body != null) {
      string.append("\n");
      string.append(body);
    }
    System.out.println(string.toString());
    return string.toString();
  }
}
