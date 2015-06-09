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
import requests
import os


def generate_year_month(str_date):
    """Take a string date and return an arrow object with year and month."""
    date_format = "MM/DD/YYYY hh:mm:SS A"
    date = arrow.get(str_date, date_format)
    return arrow.get(date.year, date.month, 1).datetime


def download_dataset():
    """Download a dataset in the "datasets" folder if not already done."""

    name = "Crimes_-_2001_to_present.csv"
    path = os.path.join("datasets", name)

    # not being used because it's too slow to start..
    original_url = "https://data.cityofchicago.org/api/views/ijzp-q8t2/rows.csv?accessType=DOWNLOAD"

    # dropbox share link
    url = "https://www.dropbox.com/s/otvhgqo8ftjkd0b/Crimes_-_2001_to_present.csv?dl=1"

    if os.path.isfile(path):
        print "Dataset was already downloaded!"

    else:
        try:
            print "Requesting download..."
            response = requests.get(url, stream=True)
            print "Starting download..."
            total_length = int(response.headers.get('content-length'))

            progress = 0.0
            with open(path, 'wb') as f:
                for data in response.iter_content(512 * 1024):
                    f.write(data)
                    progress += len(data)
                    print "Progress", "{:.2f}%".format(progress /
                                                       total_length * 100)

            print "\nDataset successfully downloaded."

        except Exception as inst:
            print "Dataset couldn't be downloaded because of", inst


def main():

    print "Downloading Crimes_-_2001_to_present.csv, this will take time..."
    download_dataset()

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
