WITH crimes_query as (SELECT crimes_collapsed.community_area, count(crimes_collapsed.crimes_count) as crimes_count
					  FROM crimes_collapsed
					  WHERE (crimes_collapsed.year_month >= ('2014-1-1T00:00:00+00:00') AND crimes_collapsed.year_month <= ('2014-12-1T00:00:00+00:00') AND crimes_collapsed.primary_type = 'ARSON')
					  GROUP BY crimes_collapsed.community_area)

SELECT crimes_query.community_area, crimes_query.crimes_count, commareas.cartodb_id, commareas.the_geom_webmercator as the_geom_webmercator
FROM commareas, crimes_query
WHERE CAST(commareas.area_numbe AS INT) = crimes_query.community_area
