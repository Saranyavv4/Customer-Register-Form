using CRUD_Project.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerContext _customerContext;

        public CustomerController(CustomerContext customerContext)
        {
            _customerContext = customerContext;
        }

        [HttpPost("CreateCustomer")]
        public async Task<Customer> CreateCustomer(Customer input)
        {
            _customerContext.Customers.Add(input);
            await _customerContext.SaveChangesAsync();
            return input;
        }

        [HttpPut("UpdateCustomerDetails")]
        public async Task<IActionResult> UpdateCustomerDetails(Customer input)
        {
            var customer = await _customerContext.Customers.FindAsync(input.Id);
            if (customer == null)
            {
                return NotFound();
            }
            customer.FirstName = input.FirstName;
            customer.LastName = input.LastName;
            customer.EmailAddress = input.EmailAddress;
            customer.PhoneNumber = input.PhoneNumber;
            customer.Address = input.Address;
            customer.CompanyName = input.CompanyName;
            customer.Designation = input.Designation;

            await _customerContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("GetAllCustomer")]
        public async Task<List<Customer>> GetAllCustomer()
        {
            return await _customerContext.Customers.ToListAsync();
        }

        [HttpDelete("DeleteCustomer/{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _customerContext.Customers.FindAsync(id);
            if(customer == null)
            {
                return NotFound();
            }
            _customerContext.Customers.Remove(customer);
            await _customerContext.SaveChangesAsync();
            return Ok();
        }
    }
}
