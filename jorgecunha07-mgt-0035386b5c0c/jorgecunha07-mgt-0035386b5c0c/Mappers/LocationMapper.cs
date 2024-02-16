using MGT.DTO;
using MGT.Entities;

namespace MGT.Mappers;

public abstract class LocationMapper
{
    public static Location ToEntity(LocationDto locationDto)
    {
        return new Location
        {
            Building = locationDto.Building,
            Room = locationDto.Room,
            X = locationDto.X,
            Y = locationDto.Y
        };
    }
    
    public static LocationDto ToDto(Location location)
    {
        return new LocationDto
        {
            Building = location.Building,
            Room = location.Room,
            X = location.X,
            Y = location.Y
        };
    }
}