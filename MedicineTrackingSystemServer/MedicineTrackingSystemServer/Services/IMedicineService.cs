using MedicineTrackingSystemServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTrackingSystemServer.Services
{
    public interface IMedicineService
    {
       List<Medicine> GetMedicines();
       Medicine GetMedicine(int id);
       void AddMedicine(Medicine medicine);
       void UpdateMedicine(int id, string value);

    }
}
