using CsvFilesLoading.Data;
using CsvFilesLoading.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace CsvFilesLoading.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CsvController : ControllerBase
    {
        private readonly string _connection;

        public CsvController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpGet("generatecsv")]
        public IActionResult GenerateCsv(int amount)
        {
            var repo = new Repository(_connection);
            var csv = repo.GenerateCsv(repo.GeneratePeople(amount));
            return File(Encoding.UTF8.GetBytes(csv),"text/csv", "people.csv");
        }

        [HttpPost("upload")]
        public void Upload(UploadVM vm)
        {
            int indexOfComa = vm.Base64.IndexOf(",");
            string base64 = vm.Base64.Substring(indexOfComa + 1);

            var repo = new Repository(_connection);
            repo.SavePeopleToDb(Convert.FromBase64String(base64));
        }

        [HttpGet("getallpeople")]
        public List<Person> GetAllPoeple()
        {
            var repo = new Repository(_connection);
            return repo.GetAllPeople();
        }

        [HttpPost("delete")]
        public void Delete()
        {
            var repo = new Repository(_connection);
            repo.Delete();
        }
    }
}
