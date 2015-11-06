#Wilcbox test for project 2

df = read.csv("turnstile_weather_v2.csv")
wilcox.test(ENTRIESn_hourly ~ rain, data = df)

df = read.csv("turnstile_data_master_with_weather.csv")
wilcox.test(ENTRIESn_hourly ~ rain, data = df)
