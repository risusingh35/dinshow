USE [Evolve_ConnectYFAI]
GO

/****** Object:  StoredProcedure [dbo].[ipTraceReportDateWise]    Script Date: 10/22/2019 4:22:42 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[ipTraceReportDateWise] @StartDate nvarchar(20) , @EndDate nvarchar(20) , @start int , @length int
AS

SELECT epod.EvolveProdOrdersDetail_Serial ,
(SELECT ei.EvolveItem_Code FROM EvolveProdOrders epo , EvolveItem ei WHERE ei.EvolveItem_ID = epo.EvolveItem_ID AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID) as childItemCode ,
(SELECT ei.EvolveItem_Desc FROM EvolveProdOrders epo , EvolveItem ei WHERE ei.EvolveItem_ID = epo.EvolveItem_ID AND epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID) as childItemDesc ,
(SELECT em.Evolve_Milling_Cycle_Part_OK FROM EvolveMilling em  WHERE  em.Evolve_Milling_Barcode = epod.EvolveProdOrdersDetail_Serial) as millingPartStatus ,
(SELECT em.Evolve_Milling_Cycle_Start_TIMESTAMP FROM EvolveMilling em  WHERE  em.Evolve_Milling_Barcode = epod.EvolveProdOrdersDetail_Serial) as millingStartTime ,
(SELECT em.Evolve_Milling_Cycle_Finished_TIMESTAMP FROM EvolveMilling em  WHERE  em.Evolve_Milling_Barcode = epod.EvolveProdOrdersDetail_Serial) as millingEndTime ,
(SELECT ev.EvolveVibration_Part_Ok_VALUE FROM EvolveVibration ev WHERE  ev.EvolveVibration_K3220_Barcode_VALUE = epod.EvolveProdOrdersDetail_Serial) as vibrationPartStatus ,
(SELECT ev.EvolveVibration_CycleStart_TIMESTAMP FROM EvolveVibration ev WHERE  ev.EvolveVibration_K3220_Barcode_VALUE = epod.EvolveProdOrdersDetail_Serial) as vibrationStartTime ,
(SELECT ev.EvolveVibration_CycleStop_TIMESTAMP FROM EvolveVibration ev WHERE  ev.EvolveVibration_K3220_Barcode_VALUE = epod.EvolveProdOrdersDetail_Serial) as vibrationEndTime ,
(SELECT ei.EvolveItem_Code FROM Evolve_Assy ea , EvolveProdOrders epo , EvolveProdOrdersDetail epodP , EvolveItem ei WHERE ea.Evolve_Assy_Child_ordersdetail_id = epod.EvolveProdOrdersDetail_ID
AND epodP.EvolveProdOrdersDetail_ID = ea.Evolve_Assy_Parent_ordersdetail_id
AND epo.EvolveProdOrders_ID = epodP.EvolveProdOrders_ID
AND ei.EvolveItem_ID = epo.EvolveItem_ID) as parentItemCode ,
(SELECT ei.EvolveItem_Desc
FROM Evolve_Assy ea , EvolveProdOrders epo , EvolveProdOrdersDetail epodP , EvolveItem ei
WHERE ea.Evolve_Assy_Child_ordersdetail_id = epod.EvolveProdOrdersDetail_ID
AND epodP.EvolveProdOrdersDetail_ID = ea.Evolve_Assy_Parent_ordersdetail_id
AND epo.EvolveProdOrders_ID = epodP.EvolveProdOrders_ID
AND ei.EvolveItem_ID = epo.EvolveItem_ID) as parentItemDesc ,
(SELECT epodP.EvolveProdOrdersDetail_Serial
FROM Evolve_Assy ea , EvolveProdOrdersDetail epodP
WHERE ea.Evolve_Assy_Child_ordersdetail_id = epod.EvolveProdOrdersDetail_ID
AND epodP.EvolveProdOrdersDetail_ID = ea.Evolve_Assy_Parent_ordersdetail_id) as parentSerial,
(SELECT epodP.EvolveProdOrdersDetail_CreatedAt
FROM Evolve_Assy ea , EvolveProdOrdersDetail epodP
WHERE ea.Evolve_Assy_Child_ordersdetail_id = epod.EvolveProdOrdersDetail_ID
AND epodP.EvolveProdOrdersDetail_ID = ea.Evolve_Assy_Parent_ordersdetail_id) as parentStart ,
(SELECT epodP.EvolveProdOrdersDetail_UpdatedAt
FROM Evolve_Assy ea , EvolveProdOrdersDetail epodP
WHERE ea.Evolve_Assy_Child_ordersdetail_id = epod.EvolveProdOrdersDetail_ID
AND epodP.EvolveProdOrdersDetail_ID = ea.Evolve_Assy_Parent_ordersdetail_id) as parentEnd
FROM EvolveProdOrdersDetail epod , EvolveProdOrders epo , EvolveItem ei 
WHERE epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID
AND ei.EvolveItem_ID = epo.EvolveItem_ID
AND ei.EvolveItem_Type = 'CHILD'
AND cast(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getDate(), @StartDate)
AND cast(epod.EvolveProdOrdersDetail_UpdatedAt as date) <= FORMAT(getDate(), @EndDate)
ORDER BY epod.EvolveProdOrdersDetail_ID DESC
OFFSET @start ROWS FETCH NEXT @length ROWS ONLY