using System;
using System.Collections.Generic;
using System.Reflection;

namespace OnlineBookstore.Helpers
{
    public class SearchFilter
    {
        public static List<T> FilterValues<T>(List<T> listToFilter, string searchTerm)
        {
            List<T> list = new List<T>();
            foreach (T t in listToFilter)
            {
                foreach (var props in typeof(T).GetProperties())
                {
                    PropertyInfo propInfo = typeof(T).GetProperty(props.Name);
                    if (propInfo.PropertyType.IsPrimitive ||
                        propInfo.PropertyType.Equals(typeof(String)) ||
                        propInfo.PropertyType.Equals(typeof(Double)) ||
                        propInfo.PropertyType.Equals(typeof(Int32)))
                    {
                        if (propInfo.GetValue(t).ToString().Contains(searchTerm))
                        {
                            list.Add(t);
                            break;
                        }
                    }
                }
            }
            return list;
        }
    }
}
