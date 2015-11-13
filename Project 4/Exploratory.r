
# Columns List
cols = c("cmte_id","cand_id","cand_nm","contbr_nm","contbr_city","contbr_st",
         "contbr_zip","contbr_employer","contbr_occupation","contb_receipt_amt",
         "contb_receipt_dt","receipt_desc","memo_cd","memo_text","form_tp","file_num",
         "tran_id","election_tp", "state")

ca_df = read.csv("data/P00000001-CA.csv", col.names = cols, header = F)
ca_df["state"] = "CA"

wi_df = read.csv("data/P00000001-WI.csv", col.names = cols, header = F)
wi_df["state"] = "WI"

#Get column names
names(ca_df)

#Explore each dataset independently
dim(ca_df)
dim(wi_df)

