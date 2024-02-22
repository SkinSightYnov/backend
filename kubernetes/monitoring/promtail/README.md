# Promtail Kubernetes setup :

## Prerequisites
Promtail is running on the monitoring namespace, created when deploying the Prometheus stack.

## Deploy
Create the promtail config map
```bash
kubectl apply -f promtail-configmap.yaml
```

Create the promtail deployment
```bash
kubectl apply -f promtail-deployment.yaml
```

Get the deployment name:
```bash
kubectl get deployments --namespace=monitoring
```

Create the promtail service
```bash
kubectl apply -f promtail-service.yaml
```

## Cleanup
To delete the promtail deployment, you can use the following command:
```bash
kubectl delete -f promtail-deployment.yaml
```

To delete the promtail service, you can use the following command:
```bash
kubectl delete -f promtail-service.yaml
```

To delete the promtail config map, you can use the following command:
```bash
kubectl delete -f promtail-configmap.yaml
```

