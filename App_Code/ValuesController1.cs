using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

public class ValuesController1 : ApiController
{
    // GET api/<controller>
    public IEnumerable<string> Get()
    {
        return new string[] { "value1", "value2" };
    }

    // GET api/<controller>/5
    public string Get(int id)
    {
        return "value";
    }

    // POST api/<controller>
    public void Post([FromBody]string value)
    {
    }

    // PUT api/<controller>/5
    public void Put(int id, [FromBody]string value)
    {
    }

    // DELETE api/<controller>/5
    public void Delete(int id)
    {
    }
    public async System.Threading.Tasks.Task<HttpResponseMessage> PostStuff()
    {
        if (!Request.Content.IsMimeMultipartContent())
        {
            throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
        }

        var root = HttpContext.Current.Server.MapPath("~/App_Data/Temp/FileUploads");
        Directory.CreateDirectory(root);
        var provider = new MultipartFormDataStreamProvider(root);
        var result = await Request.Content.ReadAsMultipartAsync(provider);
        if (result.FormData["model"] == null)
        {
            throw new HttpResponseException(HttpStatusCode.BadRequest);
        }

        var model = result.FormData["model"];
        //TODO: Do something with the json model which is currently a string



        //get the files
        foreach (var file in result.FileData)
        {
            //TODO: Do something with each uploaded file
        }

        return Request.CreateResponse(HttpStatusCode.OK, "success!");
    }
}
