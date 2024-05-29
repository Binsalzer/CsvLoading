using CsvHelper.Configuration;
using CsvHelper;
using Faker;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.FileSystemGlobbing.Internal.PatternContexts;
using Microsoft.EntityFrameworkCore;

namespace CsvFilesLoading.Data
{
    public class Repository
    {
        private readonly string _connection;

        public Repository(string connection)
        {
            _connection = connection;
        }

        public List<Person> GeneratePeople(int amount)
        {
            var people = new List<Person>();

            for(int i=1;i<=amount;i++)
            {
                people.Add(new()
                {
                    FirstName = Name.First(),
                    LastName=Name.Last(),
                    Age=RandomNumber.Next(1, 97),
                    Address=Address.StreetAddress(),
                    Email=Internet.Email()
                });
            }

            return people;
        }

        public string GenerateCsv(List<Person> people)
        {
            var writer = new StringWriter();
            var csvWriter = new CsvWriter(writer, new CsvConfiguration(CultureInfo.InvariantCulture));
            csvWriter.WriteRecords(people);

            return writer.ToString();
        }

        public void SavePeopleToDb(byte[] bytes)
        {
            List<Person> people = GetFromCsvBytes(bytes);
            using var context = new CsvDataContext(_connection);
            foreach(Person p in people)
            {
                context.People.Add(p);
            }
            context.SaveChanges();
        }

        private List<Person> GetFromCsvBytes(byte[] csvBytes)
        {
            using var memoryStream = new MemoryStream(csvBytes);
            using var reader = new StreamReader(memoryStream);
            using var csvReader = new CsvReader(reader, CultureInfo.InvariantCulture);
            return csvReader.GetRecords<Person>().ToList();
        }

        public List<Person> GetAllPeople()
        {
            using var context = new CsvDataContext(_connection);
            return context.People.ToList();
        }

        public void Delete()
        {
            using var context = new CsvDataContext(_connection);
            var people = context.People;
            foreach(Person p in people)
            {
                context.Remove(p);
            }
            context.SaveChanges();
        }
    }
}
