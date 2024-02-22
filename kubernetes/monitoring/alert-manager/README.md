# Prometheus Alert manager Kubernetes setup :

## Prerequisites
Need to have the prometheus running on the monitoring namespace, created when deploying the Prometheus stack.

if running on GKE , need to give your account cluster-admin role to be able to create cluster role binding for prometheus service account. (see [Prometheus Kubernetes setup](../prometheus/README.md))

## Deploy
Create the configmap for the alertmanager configuration
```bash
kubectl apply -f alert-manager-configmap.yaml
```

Create the configmap for the alertmanager templates
```bash
kubectl apply -f alert-template-configmap.yaml
```

Deploy the alertmanager
```bash
kubectl apply -f alert-manager-deployment.yaml
```

Deploy the alertmanager service
```bash
kubectl apply -f alert-manager-service.yaml
```

## Clean up
```bash
kubectl delete -f alert-manager-configmap.yaml
kubectl delete -f alert-template-configmap.yaml
kubectl delete -f alert-manager-deployment.yaml
kubectl delete -f alert-manager-service.yaml
```



