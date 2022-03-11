using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SignalR.Pages
{
    public class ReportModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public ReportModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}