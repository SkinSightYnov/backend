# grafana_deploy.sh
echo "Starting Grafana Kubernetes setup..."

echo "Creating Grafana config map..."
kubectl apply -f grafana-configmap.yaml

echo "Creating Grafana deployment..."
kubectl apply -f grafana-deployment.yaml

echo "Getting the deployment name..."
kubectl get deployments --namespace=monitoring

echo "Creating Grafana service..."
kubectl apply -f grafana-service.yaml

echo "Accessing Grafana through the service on node port 32000..."
kubectl get svc -n monitoring

echo "Grafana Kubernetes setup completed."
