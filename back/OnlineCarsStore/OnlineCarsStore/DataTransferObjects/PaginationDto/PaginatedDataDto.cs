using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineCarsStore.DataTransferObjects
{
    public class PaginatedDataDto<T>
    {
        public List<T> Items { get; set; }
        public int CurrentPage { get; set; }
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }
        public int PageNumber { get; set; }

        public PaginatedDataDto(List<T> items, int currentPage, bool hasNext, bool hasPrevious, int pageNumber)
        {
            this.Items = items;
            this.HasNext = hasNext;
            this.HasPrevious = hasPrevious;
            this.PageNumber = pageNumber;
            this.CurrentPage = currentPage;
        }
    }
}
