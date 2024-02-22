# Grafana Kubernetes setup :

## Prerequisites
Grafana is running on the monitoring namespace, created when deploying the Prometheus stack.

## Deploy
Create the grafana config map
```bash
kubectl apply -f grafana-configmap.yaml
```

Create the grafana deployment
```bash
kubectl apply -f grafana-deployment.yaml
```

Get the deployment name:
```bash
kubectl get deployments --namespace=monitoring
```

Create the grafana service
```bash
kubectl apply -f grafana-service.yaml
```

## Access
The grafana can be accessed through the service on node port 32000, you can get the node port using the following command:
```bash
kubectl get svc -n monitoring
```

### Default Credentials
- username: admin
- password: admin

## Cleanup
To delete the grafana deployment, you can use the following command:
```bash
kubectl delete -f grafana-deployment.yaml
```

To delete the grafana service, you can use the following command:
```bash
kubectl delete -f grafana-service.yaml
```

To delete the grafana config map, you can use the following command:
```bash
kubectl delete -f grafana-configmap.yaml
```

