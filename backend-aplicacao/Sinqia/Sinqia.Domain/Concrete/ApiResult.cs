using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;

namespace Sinqia.Domain.Concrete
{
    public class ApiResult<T>
    {
        private ApiResult(
            List<T> data,
            int count,
            int pageIndex,
            int pageSize,
            string sortColumn,
            string sortOrder,
            string filterColumn,
            string filterQuery
            )
        {


            Data = data;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalCount = count;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            SortColumn = sortColumn;
            SortOrder = sortOrder;
            FilterColumn = filterColumn;
            FilterQuery = filterQuery;
        }

        #region Methods
        public static  ApiResult<T> Create(
            IQueryable<T> source,
            int pageIndex,
            int pageSize,
            string sortColumn = null,
            string sortOrder = null,
            string filterColumn = null,
            string filterQuery = null

           )
        {
            if (!String.IsNullOrEmpty(filterColumn) &&
                 !String.IsNullOrEmpty(filterQuery) &&
                  IsValidProperty(filterColumn))
            {
                source = source.Where(
                    String.Format("{0}.toUpper().Contains(@0)",
                    filterColumn),
                    filterQuery.ToUpper());
            }
            var count = source.Count();

            if (!String.IsNullOrEmpty(sortColumn) && IsValidProperty(sortColumn))
            {
                sortOrder = !String.IsNullOrEmpty(sortOrder) && sortOrder.ToUpper() == "ASC" ? "ASC" : "DESC";

                source = source.OrderBy(
                    String.Format("{0} {1}",
                                  sortColumn,
                                  sortOrder));
            }

            source = source
                            .Skip(pageIndex * pageSize)
                            .Take(pageSize);

            var data =  source.ToList();

            return new ApiResult<T>(data,
                                    count,
                                    pageIndex,
                                    pageSize,
                                    sortColumn,
                                    sortOrder,
                                    filterColumn,
                                    filterQuery);
        }

        public static bool IsValidProperty(string propertyName, bool throwExceptionIfNotFound = true)
        {
            var prop = typeof(T).GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            if (prop == null && throwExceptionIfNotFound)
                throw new NotSupportedException(
                    String.Format("Error:Property'{0}'does not exist.", propertyName));
            return prop != null;
        }

        #endregion

        #region Propriedades


        public List<T> Data { get; private set; }

        public int PageIndex { get; private set; }

        public int PageSize { get; private set; }

        public int TotalCount { get; private set; }

        public int TotalPages { get; private set; }

        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 0);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return ((PageIndex + 1) < TotalPages);
            }
        }

        public string SortColumn { get; set; }

        public string SortOrder { get; set; }

        public string FilterColumn { get; set; }

        public string FilterQuery { get; set; }

        #endregion
    }
}
