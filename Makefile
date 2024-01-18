.PHONY: all build_linux build_image deploy_image

all: build_linux build_image replace_image

build_linux:
	yarn build

build_image:
	docker buildx build --platform=linux/amd64 -t harbor.iguming.net/sre/fault-ui:latest . --push

replace_image:
	kubecm switch ali-pro-config
	kubectl delete deploy fault-ui-deploy -n sre
	kubectl apply -f fault-ui.yaml

deploy_image:
	kubecm switch ali-pro-config
	kubectl apply -f fault-center.yaml
