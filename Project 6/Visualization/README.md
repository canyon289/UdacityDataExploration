# SlopeGraph Visualization of Manufacturing Data
During the course of my work as an Industrial Engineer
I'm frequently asked to identify potential areas of improvement.
Luckily modern day factories collect enormous amounts of information
regarding their operation.   
This particular visualization was created from an initial dataset
that spanned about 1.2 million rows. It has been summarized
into the difference of averages from the baseline year of 2013.


## Visualization Note
This visualization was designed for employees in a particular company.
As is such there is two downsides for the uninitiated viewer.
Firstly the employees of the NOV plant will inherently understand
some of the internal jargon, such as workcenters, without
needing any extra information in the visualization
Secondly the visualization has been completely stripped of proprietary
information which unfortunately does make it more difficult to read
and hinders it functionality somewhat.

For those curious of the full context a deeper explanation is provided in the 
appendix.

#Design
This visualization stemmed from a need to understand how the business was
changing over time. When initially presented with a dataset, the first
exploratory analysis focused on standard summary statistics, like means
of the facility as a whole, or workcenters. It was required that we plot
the statistics over time as the fundamental question was how has the business
changed. As is such the visualizations quickly fell to time series. However when
plotting time series it became apparent that we were less interesting in the 
mean value over time, but more so the change in mean value over time. 
This is where the idea of slopegraphs came from, as they are particularly
effective of showing how values are differing from year to year.

During the EDA phase it was also found that if we set 2013 as a baseline across
all part numbers it would be easier to discern what increased and decreased in 
value. 2013 was not chosen arbitrarily, it was the first full year on a new ERP
system which equivalently was the first full year of data.

During the feedback phase, the initial charts from ggplot were informative,
but it was hard to dive into the details. As I modeled through d3.js, additional
layers were added to make the chart easier to read, as well as access relevant
information. Specifically of interest, coloring was added to allow quick
identification of trends, and opacity and line width changes allowed the eye
to focus on the items of interest. Additionally the visualization itself
became a portal to a documentation API that was backed by a corporate document
store. This meant it became incredibly simple for users at the organization
to both identify points of interest and delve into another system for details
more easily. This was all incorporated due to feedback

#Feedback
Feedback was solicited by publishing the visualization on the company intranet
and asking for responses. The visualization was used in meetings as well
to discover actionable items. Most of the feedback was incorporated, except
for one particular request to be able to hide lines and have the plot rescale.
This was unfortunately not completed due to time constraints and the added 
complexity of implementation, but it is quite a good suggestion.

Nearly all the feedback centered around being able to identify individual part
numbers more quickly, as well as access to the raw data in an Excel format
to further analyze the information.

Around 11 people provided in depth feedback, with small tips coming from about 
20 or so others.

#Resources
*http://getbootstrap.com/
*https://github.com/mbostock/d3/wiki/API-Reference
*http://stackoverflow.com/