package request;

import java.util.Arrays;

public class CustomParser {

  public static ParsedRequest parse(String request){
    ParsedRequest result = new ParsedRequest();
    String[] splitted = request.split("\n",-1);
    String[] paramSplit = splitted[0].split(" "); //split request
    String[] url = paramSplit[1].split("\\?");
    if(url.length > 1) {
      String[] query = url[1].split("=");
      if(query.length > 0) result.setQueryParam(query[0],query[1]);
    }
    result.setPath(url[0]);
    result.setMethod(paramSplit[0]);
    Arrays.stream(splitted).forEach(line -> System.out.println(line + " " + line.length()));

    if(splitted.length > 3 && splitted[splitted.length-2].equals("")) result.setBody(splitted[splitted.length-1]);
    else result.setBody("\n");
    return result;
  }
}
