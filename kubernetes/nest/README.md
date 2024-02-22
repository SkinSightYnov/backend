# Nest JS Kubernetes setup :

## Prerequisites
Need to have the nest js application as a docker image , hosted on a docker registry.
(here we'll be using the public docker hub registry : r0ht/skinsight)


## Deploy

Create the namespace api
```bash
kubectl create namespace api
```

Create the ConfigMap
```bash
kubectl apply -f nest-configmap.yaml
```

Create the deployment
```bash
kubectl apply -f nest-deployment.yaml
```

Create the service
```bash
kubectl apply -f nest-service.yaml
```

## Clean up
```bash
kubectl delete -f nest-service.yaml
kubectl delete -f nest-deployment.yaml
kubectl delete -f nest-configmap.yaml
kubectl delete namespace api
```

## Access the application
```bash
kubectl get svc -n api
```

