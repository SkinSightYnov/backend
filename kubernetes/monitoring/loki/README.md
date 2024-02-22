# Loki Kubernetes setup :

## Prerequisites
Loki is running on the monitoring namespace, created when deploying the Prometheus stack.

## Deploy
Create the loki config map
```bash
kubectl apply -f loki-configmap.yaml
```

Create the loki deployment
```bash
kubectl apply -f loki-deployment.yaml
```

Get the deployment name:
```bash
kubectl get deployments --namespace=monitoring
```

Create the loki service
```bash
kubectl apply -f loki-service.yaml
```

## Access

you can access the loki dashboard at http://localhost:3100



## Cleanup
To delete the loki deployment, you can use the following command:
```bash
kubectl delete -f loki-deployment.yaml
```

To delete the loki service, you can use the following command:
```bash
kubectl delete -f loki-service.yaml
```

To delete the loki config map, you can use the following command:
```bash
kubectl delete -f loki-configmap.yaml
```

