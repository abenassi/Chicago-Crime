#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
create_dataset

Use the Chicago's crime dataset that can be downloaded from
https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.csv?accessType=DOWNLOAD
and collapse it by Community Area, Primary Type (of crime) and Year-Month.
"""

from __future__ import unicode_literals
import pandas as pd
import arrow


def generate_year_month(str_date):
    """Take a string date and return an arrow object with year and month."""
    date_format = "MM/DD/YYYY hh:mm:SS A"
    date = arrow.get(str_date, date_format)
    return arrow.get(date.year, date.month, 1).datetime


def main():
    print "Reading csv dataset into a pandas data frame..."
    df = pd.read_csv("./datasets/Crimes_-_2001_to_present.csv")

    # keep only needed columns
    df_small = df[["Date", "Primary Type", "Community Area"]]

    print "Generating year-month field, this could take a while..."
    df_small["year_month"] = map(generate_year_month, df_small["Date"])

    print "Grouping by area, crime type and year-month..."
    group = df_small.groupby(["Primary Type", "Community Area", "year_month"])

    # save new collapsed data frame in a csv file
    df_grouped = pd.DataFrame({"crimes_count": group.size()}).reset_index()
    df_grouped.to_csv("./output/crimes_collapsed.csv")

    print "Dataset successfully collapsed!"


if __name__ == '__main__':
    main()
