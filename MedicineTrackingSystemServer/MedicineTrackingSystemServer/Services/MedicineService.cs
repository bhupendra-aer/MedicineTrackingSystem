using MedicineTrackingSystemServer.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTrackingSystemServer.Services
{
    public class MedicineService : IMedicineService
    {
        public void AddMedicine(Medicine medicine)
        {
            try
            {
                var json = File.ReadAllText("medicineFile.json");
                var medicineList= JsonConvert.DeserializeObject<List<Medicine>>(json);
                int lastUsedId = medicineList.Count == 0?0:medicineList.Max(m => m.Id);
                medicine.Id = lastUsedId + 1;
                medicineList.Add(medicine);
                string newJsonResult = Newtonsoft.Json.JsonConvert.SerializeObject(medicineList, Newtonsoft.Json.Formatting.Indented);
                File.WriteAllText("medicineFile.json", newJsonResult);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Add Error : " + ex.Message.ToString());
            }
        }

        public List<Medicine> GetMedicines()
        {
                var json = File.ReadAllText("medicineFile.json");
                return JsonConvert.DeserializeObject<List<Medicine>>(json);
        }
        public Medicine GetMedicine(int id)
        {
            var json = File.ReadAllText("medicineFile.json");
            List<Medicine> medicineList= JsonConvert.DeserializeObject<List<Medicine>>(json);
            return medicineList.FirstOrDefault(m => m.Id == id);
        }
        public void UpdateMedicine(int id, string value)
        {
            var json = File.ReadAllText("medicineFile.json");
            List<Medicine> medicineList = JsonConvert.DeserializeObject<List<Medicine>>(json);
            Medicine medicine= medicineList.FirstOrDefault(m => m.Id == id);
            medicine.Notes = value;
            string newJsonResult = Newtonsoft.Json.JsonConvert.SerializeObject(medicineList, Newtonsoft.Json.Formatting.Indented);
            File.WriteAllText("medicineFile.json", newJsonResult);
        }
    }
}
