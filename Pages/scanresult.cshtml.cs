using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SignalR.Pages
{
    public class ScanResultModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public ScanResultModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}