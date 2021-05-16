using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Moq;
using Sinqia.Domain.Abstract;
using Sinqia.Domain.Concrete;
using Sinqia.Domain.Entites;

using Ninject;
using System.Web.Mvc;

namespace Sinqia.WebAPI.Infrastructure
{
    public class NinjectDependencyResolver: IDependencyResolver
    {
        private readonly IKernel kernel;

        public NinjectDependencyResolver(IKernel kernelParam)
        {
            kernel = kernelParam;
            AddBindings();
        }
              

        public object GetService(Type serviceType)
        {
            return kernel.TryGet(serviceType);
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return kernel.GetAll(serviceType);
        }
        private void AddBindings()
        {            
            kernel.Bind<IProdutoRepositorio>().To<ProdutoRespositorio>();
            kernel.Bind<IProdutosCosifRepositorio>().To<ProdutoCosifRepositorio>();
            kernel.Bind<IMovimentoManualRepositorio>().To<MovimentoManualRepositorio>();
        }
    }
}