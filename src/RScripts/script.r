library(tidyverse) #pacote para manipulacao de dados
library(cluster) #algoritmo de cluster
# # library(dendextend) #compara dendogramas
# library(factoextra) #algoritmo de cluster e visualizacao
# library(fpc) #algoritmo de cluster e visualizacao
# library(gridExtra) #para a funcao grid arrange
# library(readxl)
# library(reshape)
# library(dplyr)



####################################################################
#
#                       CLUSTER HIERARQUICO
#
####################################################################
x = function(clustermethod, distancesmethod, groups, csv_path, result_path, now) {
	#READ DATA
	DT_PacientesOriginal <- read.table(csv_path, sep = ";", header = T, dec = ",")
	# write.csv2(DT_PacientesOriginal, "./uploads/DT_PacientesOriginal.csv", row.names = TRUE, fileEncoding = "UTF-8")

	#RENOMEANDO CAMPOS
	# DT_PacientesOriginal <- DT_PacientesOriginal %>%
	# rename("Idade_Anos" = "Idade.Anos.",
	# 		"Peso_kg" = "Peso.kg.",
	# 		"Glicemia_mgdl" = "GlicemiaJejum.mg.dL.",
	# 		"Prolactina_ngmL" = "Prolactina.ng.mL.",
	# 		"HDLb_mgdl" = "ColesterolHDL.mg.dl.",
	# 		"LDLr_mgdl" = "ColesterolLDL.mg.dl.",
	# 		"Triglicérides_mgdl" = "Triglicérides.mg.dl.",
	# 		"DoseDiáriaRisperidona_mg" = "DosagemDiáriaRisperidona.mg.",
	# 		"DoseDiáriaValproato_mg" = "DosagemDiáriaValproato.mg.")

	#View(DT_PacientesOriginal)

	#PROMOVENDO ROWNAME
	# rownames(DT_PacientesOriginal) <- DT_PacientesOriginal[,1]

	#DELETANDO VARIÁVEIS QUALITATIVAS
	DT_PacientesOriginalTodasVariaveis <- DT_PacientesOriginal

	#DELETANDO VARIÁVEIS QUALITATIVAS
	DT_PacientesOriginal <- DT_PacientesOriginal[, -c(1:3)]

	# return(DT_PacientesOriginal)
	#PADRONIZAÇÃO DAS ESCALAS
	DT_PacientesPadronizado <- scale(DT_PacientesOriginal)

	#CALCULATING DISTANCES MATRIX
	d <- dist(DT_PacientesPadronizado, method = distancesmethod)
	#d


	#DEFINITION 4 CLUSTERS FROM THE CHOSEN METHODS
	#Available Methods "average", "single", "complete" e "ward.D"
	#hc1 <- hclust(d, method = "single" )
	hc2 <- hclust(d, method = clustermethod )
	#hc3 <- hclust(d, method = "average" )
	#hc4 <- hclust(d, method = "ward.D" )

	#DESENHANDO O DENDOGRAMA
	#plot(hc1, cex = 0.6, hang = -1)
	#plot(hc2, cex = 0.6, hang = -1)
	#plot(hc3, cex = 0.6, hang = -1)
	#plot(hc4, cex = 0.6, hang = -1)

	#COMPARE DENDROGRAM 1 DIVIDED IN 4 CLUSTER
	#rect.hclust(hc3, k = 2)

	#criando 4 grupos de pacientes com base no cluster hc2 (method = "complete")
	Grupo <- cutree(hc2, k = groups)
	# table(Grupo)

	#Transformando em data frame a saida do cluster
	Pacientes_Grupos <- data.frame(Grupo)

	#Juntando com a base original
	#DatasetPacientes_fim <- cbind(DT_PacientesOriginal, Pacientes_Grupos)

	DatasetPacientes_fim <- cbind(DT_PacientesOriginalTodasVariaveis, Pacientes_Grupos)

	# DatasetPacientes_fim <- DatasetPacientes_fim %>%
	# 	rename("Grupo" = "Grupo")

	#Lista de Colunas
	colnames(DatasetPacientes_fim)

	#ANALISE DESCRITIVA
	#MEDIAS das variaveis por grupo
	MediaGrupo_Pacientes <- DatasetPacientes_fim %>%
	group_by(Grupo) %>%
	summarise(n = n(),
				Age = round(mean(Age), digits=1),
				Weight = round(mean(Weight), digits=1),
				Glycemia = round(mean(Glycemia), digits=0),
				Prolactin = round(mean(Prolactin), digits=0),
				HDL = round(mean(HDL), digits=0),
				LDL = round(mean(LDL), digits=0),
				Triglycerides = round(mean(Triglycerides), digits=0),
				Risperidone = round(mean(Risperidone), digits=0),
				Valproate = round(mean(Valproate), digits=0)
	)

	DesvioPadraoGrupo_Pacientes <- DatasetPacientes_fim %>%
	group_by(Grupo) %>%
	summarise(n = n(),
				Age = round(sd(Age), digits=1),
				Weight = round(sd(Weight), digits=1),
				Glycemia = round(sd(Glycemia), digits=0),
				Prolactin = round(sd(Prolactin), digits=0),
				HDL = round(sd(HDL), digits=0),
				LDL = round(sd(LDL), digits=0),
				Triglycerides = round(sd(Triglycerides), digits=0),
				Risperidone = round(sd(Risperidone), digits=0),
				Valproate = round(sd(Valproate), digits=0)
	)


	# View(MediaGrupo_Pacientes)
	# DatasetPacientes_fim2 <- DatasetPacientes_fim[order(Grupo),]
	#Gerando CVS das médias
	write.csv2(DatasetPacientes_fim, paste("./uploads/", now, "output_all.csv", sep=''), row.names = TRUE, fileEncoding = "UTF-8")
	# write.csv2(DatasetPacientes_fim2, paste("./uploads/", now, "output_all_ordered.csv", sep=''), row.names = TRUE, fileEncoding = "UTF-8")
	write.csv2(MediaGrupo_Pacientes, paste("./uploads/", now, "output_media.csv", sep=''), row.names = TRUE, fileEncoding = "UTF-8")
	write.csv2(DesvioPadraoGrupo_Pacientes, paste("./uploads/", now, "output_sd.csv", sep=''), row.names = TRUE, fileEncoding = "UTF-8")

	#Entendendo o Grupo 3
	# Grupo3<-subset(DatasetPacientes_fim, Grupo=='3')
	# # View(Grupo3)


	# write.csv2(Grupo3,"./uploads/_Grupo3.csv", row.names = TRUE, fileEncoding = "UTF-8")
}