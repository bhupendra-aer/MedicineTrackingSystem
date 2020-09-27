using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicineTrackingSystemServer.Models;
using MedicineTrackingSystemServer.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MedicineTrackingSystemServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineController : ControllerBase
    {
        private IMedicineService _medicineService;
        public MedicineController(IMedicineService medicineservice)
        {
            _medicineService = medicineservice;
        }


        // GET: api/<MedicineController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var medicines = _medicineService.GetMedicines();
                return Ok(new APIResponse<dynamic>(true, "success", medicines));
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        // GET api/<MedicineController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(new APIResponse<dynamic>(true, "success", _medicineService.GetMedicine(id)));
        }

        // POST api/<MedicineController>
        [HttpPost]
        public IActionResult Post([FromBody] Medicine medicine)
        {
          
            try
            {
                _medicineService.AddMedicine(medicine);
                return StatusCode(201,new APIResponse(true, "success"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/<MedicineController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] string value)
        {
            try
            {
                _medicineService.UpdateMedicine(id,value);
                return Ok(new APIResponse(true, "success"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE api/<MedicineController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
