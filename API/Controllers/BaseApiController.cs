using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediaotr;
        protected IMediator Mediator =>
        _mediaotr ??= HttpContext.RequestServices.GetService<IMediator>() ??
        throw new InvalidOperationException("Mediator service is unavailable");

    }
}
