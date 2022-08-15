using OnlineCarsStore.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;


namespace OnlineCarsStore.Helpers
{
    public class PaginatedList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPageNumber { get; set; }
        public bool HasPrevious { get; private set; }
        public bool HasNext { get; private set; }

        private PaginatedList(IQueryable<T> source, int currentPage, int pageSize,int totalPageNumber)
        {
            this.CurrentPage = currentPage;
            this.TotalPageNumber = totalPageNumber;
            var items = source.Skip((currentPage - 1) * pageSize).Take(pageSize);
            this.AddRange(items);
            this.HasNext = CurrentPage < TotalPageNumber ? true : false;
            this.HasPrevious = CurrentPage > 1 ? true : false;
        }

        public static PaginatedList<T> ToPaginatedList(IQueryable<T> source, int currentPage, int pageSize) {
            int totalPageNumber = (int)Math.Ceiling(source.Count() / (double)pageSize);
            if (currentPage == 0 || currentPage > totalPageNumber)
                return null;
            return new PaginatedList<T>(source,currentPage,pageSize,totalPageNumber);

        }
        public static PaginatedDataDto<T> ApplyPagination(IQueryable<T> source, int currentPage, int pageSize)
        {
            int totalPageNumber = (int)Math.Ceiling(source.Count() / (double)pageSize);
            if (currentPage == 0 || currentPage > totalPageNumber)
                return null;
            var items = new PaginatedList<T>(source, currentPage, pageSize, totalPageNumber);
            return new PaginatedDataDto<T>(items,items.CurrentPage,items.HasNext, items.HasPrevious, items.TotalPageNumber);
        }
    }
}
