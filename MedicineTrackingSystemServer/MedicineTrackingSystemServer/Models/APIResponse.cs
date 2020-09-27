using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicineTrackingSystemServer.Models
{
    public class APIResponse
    {
        public bool isSuccess { get; set; }
        public string message { get; set; }

        public APIResponse()
        {
            isSuccess = false;
            message = null;
        }

        public APIResponse(bool isSuccess)
        {
            this.isSuccess = isSuccess;
        }

        public APIResponse(string message)
        {
            this.message = message;
        }

        public APIResponse(bool isSuccess, string message)
        {
            this.isSuccess = isSuccess;
            this.message = message;
        }
    }

    public class APIResponse<T> : APIResponse
    {
        public T data { get; set; }
        public APIResponse()
        { }

        public APIResponse(bool isSuccess, string message, T data)
        {
            this.isSuccess = isSuccess;
            this.message = message;
            this.data = data;
        }
    }
}
